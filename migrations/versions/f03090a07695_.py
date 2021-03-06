"""empty message

Revision ID: f03090a07695
Revises: d9b2e3ebc326
Create Date: 2021-12-12 21:39:23.745180

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f03090a07695'
down_revision = 'd9b2e3ebc326'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('questions', 'must_answer9')
    op.drop_column('questions', 'question7')
    op.drop_column('questions', 'must_answer10')
    op.drop_column('questions', 'must_answer8')
    op.drop_column('questions', 'must_answer7')
    op.drop_column('questions', 'question9')
    op.drop_column('questions', 'question10')
    op.drop_column('questions', 'question8')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('questions', sa.Column('question8', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('questions', sa.Column('question10', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('questions', sa.Column('question9', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('questions', sa.Column('must_answer7', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('questions', sa.Column('must_answer8', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('questions', sa.Column('must_answer10', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('questions', sa.Column('question7', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('questions', sa.Column('must_answer9', sa.VARCHAR(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
